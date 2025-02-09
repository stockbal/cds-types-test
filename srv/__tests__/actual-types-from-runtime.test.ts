import type { Book } from "#cds-models/CatalogService";
import cds from "@sap/cds";
import { ReqDataLogger } from "../handler-util";

describe("Test 'req.data' character in Service Handlers (Runtime expectation)", () => {
  const { data, GET, POST, PATCH } = cds
    .test("serve", "--with-mocks")
    .in(`${__dirname}/../..`);

  const book1 = {
    ID: "8a8612be-4215-47a8-8c85-6abd1f7e415b",
    title: "Dune",
  };
  const book2 = {
    ID: "8d94348f-cf26-4699-b800-7a96c86ead2c",
    title: "Jane Eyre",
  };
  const createNewBook = async () => {
    await POST("/odata/v4/catalog/Books", {
      ID: "0471b72c-b5f0-438f-8c62-aa4680b46437",
      title: "New Book",
    });
    await POST(
      `/odata/v4/catalog/Books(ID=0471b72c-b5f0-438f-8c62-aa4680b46437,IsActiveEntity=false)/draftActivate`
    );
  };
  const updateDraft = async () => {
    await POST(
      `/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=true)/draftEdit`
    );
    await PATCH(
      `/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=false)`,
      {
        title: "Dune - Remastered",
      }
    );
  };
  const editActivateExistingBook = async () => {
    await POST(
      `/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=true)/draftEdit`
    );
    await POST(
      `/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=false)/draftActivate`
    );
  };

  beforeEach(async () => {
    ReqDataLogger.reset();
    await data.delete();
    const { Books } = cds.entities("my.bookshop");

    await INSERT.into(Books).entries([book1, book2]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Singular Tests", () => {
    it('req.data in before("CREATE", Book) is a single object', async () => {
      await createNewBook();
      expect(ReqDataLogger.instance.beforeCreateBookIsArray).toBe(false);
    });

    it('req.data in on("CREATE", Book) is a single object', async () => {
      await createNewBook();
      expect(ReqDataLogger.instance.onCreateBookIsArray).toBe(false);
    });

    it('req.data in after("UPDATE", Book) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.onUpdateBookIsArray).toBe(false);
    });

    it('req.data in before("UPDATE", Book) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.beforeUpdateBookIsArray).toBe(false);
    });

    it('req.data in on("UPDATE", Book) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.onUpdateBookIsArray).toBe(false);
    });

    it('req.data in after("UPDATE", Book) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.afterUpdateBookIsArray).toBe(false);
    });

    it('req.data in after("READ", Book) is a single object (is_singular:true converts READ into each)', async () => {
      await GET("/odata/v4/catalog/Books");
      expect(ReqDataLogger.instance.afterReadBookIsArray).toBe(false);
    });

    it('req.data in after("READ", Book) for single READ is a single object (is_singular:true converts READ into each)', async () => {
      await GET(`/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=true)`);
      expect(ReqDataLogger.instance.afterReadBookIsArray).toBe(false);
    });

    it('req.data in after("each", Book) is a single object', async () => {
      await GET("/odata/v4/catalog/Books");
      expect(ReqDataLogger.instance.afterEachBookIsArray).toBe(false);
    });
  });

  describe("Plural Tests", () => {
    it('req.data in before("CREATE", Books) is a single object', async () => {
      await createNewBook();
      expect(ReqDataLogger.instance.beforeCreateBooksIsArray).toBe(false);
    });

    it('req.data in on("CREATE", Books) is a single object', async () => {
      await createNewBook();
      expect(ReqDataLogger.instance.onCreateBooksIsArray).toBe(false);
    });

    it('req.data in after("UPDATE", Books) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.onUpdateBooksIsArray).toBe(false);
    });

    it('req.data in before("UPDATE", Books) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.beforeUpdateBooksIsArray).toBe(false);
    });

    it('req.data in on("UPDATE", Books) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.onUpdateBooksIsArray).toBe(false);
    });

    it('req.data in after("UPDATE", Books) is a single object', async () => {
      await editActivateExistingBook();
      expect(ReqDataLogger.instance.afterUpdateBooksIsArray).toBe(false);
    });

    it('req.data in after("READ", Books) is an array', async () => {
      await GET("/odata/v4/catalog/Books");
      expect(ReqDataLogger.instance.afterReadBooksIsArray).toBe(true);
    });

    it('req.data in after("READ", Books) for single READ is an array', async () => {
      await GET(`/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=true)`);
      expect(ReqDataLogger.instance.afterReadBooksIsArray).toBe(true);
    });

    it('req.data in after("each", Books) is a single object', async () => {
      await GET("/odata/v4/catalog/Books");
      expect(ReqDataLogger.instance.afterEachBooksIsArray).toBe(false);
    });
  });

  describe("Drafts Tests", () => {
    const newBookDraft = async () =>
      POST("/odata/v4/catalog/Books", {
        title: "new book",
      });

    it('req.data in before("CREATE", Books.drafts) is a single object', async () => {
      await newBookDraft();
      expect(ReqDataLogger.instance.beforeCreateBookDraftsIsArray).toBe(false);
    });

    it('req.data in on("CREATE", Books.drafts) is a single object', async () => {
      await newBookDraft();
      expect(ReqDataLogger.instance.onCreateBookDraftsIsArray).toBe(false);
    });

    it('req.data in after("CREATE", Books.drafts) is a single object', async () => {
      await newBookDraft();
      expect(ReqDataLogger.instance.afterCreateBookDraftsIsArray).toBe(false);
    });

    it('req.data in before("UPDATE", Books.drafts) is a single object', async () => {
      await updateDraft();
      expect(ReqDataLogger.instance.beforeUpdateBookDraftsIsArray).toBe(false);
    });

    it('req.data in on("UPDATE", Books.drafts) is a single object', async () => {
      await updateDraft();
      expect(ReqDataLogger.instance.onUpdateBookDraftsIsArray).toBe(false);
    });

    it('req.data in after("UPDATE", Books.drafts) is a single object', async () => {
      await updateDraft();
      expect(ReqDataLogger.instance.afterUpdateBookDraftsIsArray).toBe(false);
    });

    it('req.data in after("READ", Books.drafts) is an array', async () => {
      await POST(
        `/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=true)/draftEdit`
      );
      await GET("/odata/v4/catalog/Books"); //?$filter=IsActiveEntity eq false");
      expect(ReqDataLogger.instance.afterReadBookDraftsIsArray).toBe(true);
    });

    it('req.data in after("READ", Books.drafts) for single read is an array', async () => {
      await POST(
        `/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=true)/draftEdit`
      );
      await GET(`/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=false)`);
      expect(ReqDataLogger.instance.afterReadBookDraftsIsArray).toBe(true);
    });

    it('req.data in after("each", Books.drafts) is a single object', async () => {
      await POST(
        `/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=true)/draftEdit`
      );
      await GET(`/odata/v4/catalog/Books(ID=${book1.ID},IsActiveEntity=false)`);
      expect(ReqDataLogger.instance.afterEachBookDraftsIsArray).toBe(false);
    });
  });
});
