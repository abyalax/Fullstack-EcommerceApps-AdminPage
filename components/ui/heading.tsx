interface Headingprops {
    title: string,
    description: string
}

const Heading = (props: Headingprops) => {

    const { title, description } = props

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}


export default Heading
