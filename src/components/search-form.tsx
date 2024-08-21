type SearchFormProps = {};

function SearchForm(props: SearchFormProps) {
  return (
    <>
      <form className="w-full h-full" action="">
        <input
          type="text"
          className="w-full h-full bg-accent-light rounded-sm"
        />
      </form>
    </>
  );
}

export default SearchForm;
