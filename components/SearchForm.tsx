import Form from 'next/form';
import FormReset from './FormReset';

const SearchForm = ({ query }: { query?: string }) => (
  <Form action="/" scroll={false} className="search-form">
    {/* On submission, the input value will be appended to 
        the URL, e.g. /search?query=abc */}
    <input
      name="query"
      placeholder="search startups"
      defaultValue={query}
      
    />
    <div>
      {query && <FormReset />}
      <button type="submit">search</button>
    </div>
  </Form>
);

export default SearchForm;
