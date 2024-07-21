import { ApplicationService } from "@sap/cds";
import type { Book } from "#cds-models/CatalogService";
import { ReqDataLogger } from "./handler-util";

type ArrayConstructable<T> = { new (...args: any[]): T[] };
type Constructable<T = any> = { new (...args: any[]): T };

export default class CatalogService extends ApplicationService {
  override async init() {
    // NOTE: to avoid jest issues with "await import", the cds.entities approach with import type is taken
    const { Books } = this.entities as unknown as {
      Books: ArrayConstructable<Book> & {
        drafts: Constructable<Book>;
      };
    };

    const Book = {
      is_singular: true,
      __proto__: Books,
    } as unknown as Constructable<Book> & { is_singular: boolean };

    this.before("CREATE", Book, (req) => {
      ReqDataLogger.instance.beforeCreateBookIsArray = Array.isArray(req.data);
    });
    this.on("CREATE", Book, (req, next) => {
      ReqDataLogger.instance.onCreateBookIsArray = Array.isArray(req.data);
      return next();
    });
    this.after("CREATE", Book, (data) => {
      ReqDataLogger.instance.afterCreateBookIsArray = Array.isArray(data);
    });
    this.before("UPDATE", Book, (req) => {
      ReqDataLogger.instance.beforeUpdateBookIsArray = Array.isArray(req.data);
    });
    this.on("UPDATE", Book, (req, next) => {
      ReqDataLogger.instance.onUpdateBookIsArray = Array.isArray(req.data);
      return next();
    });
    this.after("UPDATE", Book, (data) => {
      ReqDataLogger.instance.afterUpdateBookIsArray = Array.isArray(data);
    });
    this.after("each", Book, (data) => {
      ReqDataLogger.instance.afterEachBookIsArray = Array.isArray(data);
    });
    this.after("READ", Book, (data) => {
      ReqDataLogger.instance.afterReadBookIsArray = Array.isArray(data);
    });

    // PLURAL
    this.before("CREATE", Books, (req) => {
      ReqDataLogger.instance.beforeCreateBooksIsArray = Array.isArray(req.data);
    });
    this.before("UPDATE", Books, (req) => {
      ReqDataLogger.instance.beforeUpdateBooksIsArray = Array.isArray(req.data);
    });
    this.on("CREATE", Books, (req, next) => {
      ReqDataLogger.instance.onCreateBooksIsArray = Array.isArray(req.data);
      return next();
    });
    this.on("UPDATE", Books, (req, next) => {
      ReqDataLogger.instance.onUpdateBooksIsArray = Array.isArray(req.data);
      return next();
    });
    this.after("CREATE", Books, (data) => {
      ReqDataLogger.instance.afterCreateBookIsArray = Array.isArray(data);
    });
    this.after("UPDATE", Books, (data) => {
      ReqDataLogger.instance.afterUpdateBooksIsArray = Array.isArray(data);
    });
    this.after("each", Books, (data) => {
      ReqDataLogger.instance.afterEachBooksIsArray = Array.isArray(data);
    });
    this.after("READ", Books, (data) => {
      ReqDataLogger.instance.afterReadBooksIsArray = Array.isArray(data);
    });

    // DRAFTS
    this.before("CREATE", Books.drafts, (req) => {
      ReqDataLogger.instance.beforeCreateBookDraftsIsArray = Array.isArray(
        req.data
      );
    });
    this.on("CREATE", Books.drafts, (req, next) => {
      ReqDataLogger.instance.onCreateBookDraftsIsArray = Array.isArray(
        req.data
      );
      return next();
    });
    this.after("CREATE", Books.drafts, (data) => {
      ReqDataLogger.instance.afterCreateBookDraftsIsArray = Array.isArray(data);
    });
    this.before("UPDATE", Books.drafts, (req) => {
      ReqDataLogger.instance.beforeUpdateBookDraftsIsArray = Array.isArray(
        req.data
      );
    });
    this.on("UPDATE", Books.drafts, (req, next) => {
      ReqDataLogger.instance.onUpdateBookDraftsIsArray = Array.isArray(
        req.data
      );
      return next();
    });
    this.after("UPDATE", Books.drafts, (data) => {
      ReqDataLogger.instance.afterUpdateBookDraftsIsArray = Array.isArray(data);
    });
    this.after("READ", Books.drafts, (data) => {
      ReqDataLogger.instance.afterReadBookDraftsIsArray = Array.isArray(data);
    });
    this.after("each", Books.drafts, (data) => {
      ReqDataLogger.instance.afterReadBookDraftsIsArray = Array.isArray(data);
    });
    return super.init();
  }
}
