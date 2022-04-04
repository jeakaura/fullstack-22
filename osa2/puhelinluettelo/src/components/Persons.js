import Person from "./Person"

const Persons = ({ filtteri,removeName }) => {
    return(
        <div>
            {filtteri.map(name => 
                <Person key={name.id} person={name} number={name.number} removeName={removeName} />
            )}
        </div>
    )
}

export default Persons