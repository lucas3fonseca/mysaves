interface HomeViewProps {
  text: string
}

export const HomeView = ({ text }: HomeViewProps) => {
  return <>{`Home Body: ${text}`}</>
}