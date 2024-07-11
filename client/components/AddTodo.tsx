// eslint-disable-next-line no-unused-vars
function AddTodo() {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleChange(e)}
          id="todo"
          name="todo"
          className="new-todo"
          placeholder="What do you need to do?"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={form}
        />
      </form>
    </>
  )
}

export default AddTodo
