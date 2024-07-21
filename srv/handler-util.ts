export class ReqDataLogger {
  private static _instance: ReqDataLogger | undefined;
  onCreateBookIsArray: boolean | undefined;
  onCreateBooksIsArray: boolean | undefined;
  onCreateBookDraftsIsArray: boolean | undefined;
  onUpdateBookIsArray: boolean | undefined;
  onUpdateBooksIsArray: boolean | undefined;
  onUpdateBookDraftsIsArray: boolean | undefined;
  beforeCreateBookIsArray: boolean | undefined;
  beforeCreateBooksIsArray: boolean | undefined;
  beforeCreateBookDraftsIsArray: boolean | undefined;
  beforeUpdateBookDraftsIsArray: boolean | undefined;
  beforeUpdateBooksIsArray: boolean | undefined;
  beforeUpdateBookIsArray: boolean | undefined;
  afterCreateBookIsArray: boolean | undefined;
  afterCreateBookDraftsIsArray: boolean | undefined;
  afterReadBookIsArray: boolean | undefined;
  afterReadBooksIsArray: boolean | undefined;
  afterReadBookDraftsIsArray: boolean | undefined;
  afterEachBookDraftsIsArray: boolean | undefined;
  afterEachBooksIsArray: boolean | undefined;
  afterEachBookIsArray: boolean | undefined;
  afterUpdateBookIsArray: boolean | undefined;
  afterUpdateBooksIsArray: boolean | undefined;
  afterUpdateBookDraftsIsArray: boolean | undefined;

  static get instance(): ReqDataLogger {
    if (!ReqDataLogger._instance) ReqDataLogger._instance = new ReqDataLogger();
    return ReqDataLogger._instance;
  }

  private constructor() {
    this.onCreateBookIsArray = undefined;
    this.onCreateBooksIsArray = undefined;
    this.onCreateBookDraftsIsArray = undefined;
    this.onUpdateBookIsArray = undefined;
    this.onUpdateBooksIsArray = undefined;
    this.onUpdateBookDraftsIsArray = undefined;
    this.beforeCreateBookIsArray = undefined;
    this.beforeCreateBooksIsArray = undefined;
    this.beforeCreateBookDraftsIsArray = undefined;
    this.beforeUpdateBookIsArray = undefined;
    this.beforeUpdateBooksIsArray = undefined;
    this.beforeUpdateBookDraftsIsArray = undefined;
    this.afterCreateBookIsArray = undefined;
    this.afterCreateBookDraftsIsArray = undefined;
    this.afterUpdateBookDraftsIsArray = undefined;
    this.afterUpdateBookIsArray = undefined;
    this.afterUpdateBooksIsArray = undefined;
    this.afterReadBookIsArray = undefined;
    this.afterReadBooksIsArray = undefined;
    this.afterReadBookDraftsIsArray = undefined;
    this.afterEachBookDraftsIsArray = undefined;
    this.afterEachBooksIsArray = undefined;
    this.afterEachBookIsArray = undefined;
  }
  static reset() {
    ReqDataLogger._instance = undefined;
  }
}
