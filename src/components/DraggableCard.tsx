import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  position: relative;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 10px rgba(0,0,0,0.05)" : "none"};
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  bottom: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 10px;
  border: none;
  text-align: center;
  background: antiquewhite;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onDelete = () => {
    setToDos((allBoards) => {
      const updatedBoard = [...allBoards[boardId]];
      updatedBoard.splice(index, 1);
      return { ...allBoards, [boardId]: [...updatedBoard] };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}

          <DeleteBtn onClick={onDelete}>X</DeleteBtn>
        </Card>
      )}
    </Draggable>
  );
}
// 렌더링 최적화를 위해 index가 변하는 컴포넌트만 렌더링함
// memo 안쓰면 부모 컴포넌트에서 렌더링이 많이 일어나기 때문에 사용함
export default React.memo(DraggableCard);
