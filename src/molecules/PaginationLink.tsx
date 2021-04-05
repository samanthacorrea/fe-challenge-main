import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';


export default function PaginationLink(props: any) {
  return (
    <MemoryRouter initialIndex={0}>
      <Route>
        {() => {

          return (
            <Pagination
              page={props.page}
              count={props.count}
              onChange={(data, page) => props.getItems(page)}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/${item.page === 1 ? '' : `page=${item.page}&page_size=8"`}`}
                  {...item}
                />
              )}
            />
          );
        }}
      </Route>
    </MemoryRouter>
  );
}
