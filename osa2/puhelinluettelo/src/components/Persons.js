import Person from "./Person"

const Persons = ({ filtteri }) => {
    return(
        <div>
            {filtteri.map(name => 
                <Person key={name.id} person={name} number={name.number} />
            )}
        </div>
    )
}

export default Persons