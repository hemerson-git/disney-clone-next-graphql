type Props = {
  genre: string;
};

export function Section({ genre }: Props) {
  return (
    <section>
      <h3>{genre}</h3>
    </section>
  );
}
