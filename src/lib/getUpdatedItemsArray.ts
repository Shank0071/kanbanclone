const getUpdatedItemsArray = (todos: Todos[], t: string) => {
    const updatedItems = todos.map((todo) => {
      if (todo.title === t) {
        return { title: t, category: "IN_PROGRESS" };
      }
      return todo;
    });
  
    return updatedItems;
  };

export default getUpdatedItemsArray;