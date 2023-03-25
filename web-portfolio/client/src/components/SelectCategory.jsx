function SelectCategory({ name, id, onChange, options, value }) {
    return (
      <select name={name} id={id} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  export default SelectCategory
  