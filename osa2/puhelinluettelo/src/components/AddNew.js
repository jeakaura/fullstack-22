import InputField from "./InputField"

const AddNew = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return(
        <form onSubmit={onSubmit}>
            <InputField
                label="nimi:"
                type="text"
                value={newName}
                onChange={handleNameChange}
            />
            <InputField
                label="numero:"
                type="text"
                value={newNumber}
                onChange={handleNumberChange}
            />
            <button type="submit">lisää</button>
        </form>
    )
}

export default AddNew