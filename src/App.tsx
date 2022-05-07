import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import AddCategory from "./components/AddCategory";
import Board from "./components/Board";
import DraggableCard from "./components/DraggableCard";
import TrashCan from "./components/TrashCan";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const CategoryBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToDoBox = styled.div`
  width: 100%;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trash") {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: sourceBoard };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const targetBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        // 1) Delete item on source.index
        sourceBoard.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [destination.droppableId]: targetBoard,
          [source.droppableId]: sourceBoard,
        };
      });
    } else if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) Delete item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [destination.droppableId]: boardCopy,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <CategoryBox>
          <AddCategory />
        </CategoryBox>
        <ToDoBox>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </ToDoBox>
        <TrashCan />
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
