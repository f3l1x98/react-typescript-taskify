import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  droppableId: string;
  heading: string;
  isRemove: boolean;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  droppableId,
  heading,
  isRemove,
}) => {
  // TODO perhaps refactor classes such that there is only one class -> perhaps switch to scss where I could add subclasses -> className="remove dragactive" and className="dragactive" are different
  const classes = isRemove ? "remove" : "";
  const classesDragActive = isRemove ? "dragcomplete" : "dragactive";

  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          className={`todos ${
            snapshot.isDraggingOver ? classesDragActive : classes
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <span className="todos__heading">{heading}</span>
          {todos?.map((todo, index) => (
            <SingleTodo
              index={index}
              todos={todos}
              todo={todo}
              key={todo.id}
              setTodos={setTodos}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
