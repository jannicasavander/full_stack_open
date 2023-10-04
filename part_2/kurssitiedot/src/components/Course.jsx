const Course = ({course}) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </>
    )
}

const Header = ({course}) => (<h2>{course}</h2>)

const Part = (props) => (<p>{props.part} {props.exercises}</p>)

const Content = ({parts}) => {
    return (
        <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>
        <strong>
            Total of {total} exercises
        </strong>
        </p>
    )
}

export default Course
