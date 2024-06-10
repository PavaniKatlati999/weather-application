import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import City from "./City";

const CityList = ({ cities, removeCity, showWeeklyReport, onDragEnd }) => (
  <div className="right-panel">
    {cities.length === 0 ? (
      <div>
        <h2>No cities added yet!!!</h2>
        <p>Click on 'Add City' to get started</p>
      </div>
    ) : (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"root"} type="container" key={"root"}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="cities"
            >
              {cities.map((city, index) => (
                <Draggable key={city.id} draggableId={city.id} index={index}>
                  {(provided) => (
                    <City
                      city={city}
                      index={index}
                      removeCity={removeCity}
                      showWeeklyReport={showWeeklyReport}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )}
  </div>
);

export default CityList;
