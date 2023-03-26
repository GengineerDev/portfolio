function SelectCategory({ name, id, onChange, options, defaultValue }) {
    return (
      <select name={name} id={id} onChange={onChange} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  export default SelectCategory
  