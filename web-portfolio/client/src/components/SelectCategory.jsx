function SelectCategory({ name, id, onChange, options }) {
    return (
      <select name={name} id={id} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  export default SelectCategory
  