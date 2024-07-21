using {my} from '../db/schema';

service CatalogService {
    @odata.draft.enabled
    entity Books as projection on my.bookshop.Books;
}
