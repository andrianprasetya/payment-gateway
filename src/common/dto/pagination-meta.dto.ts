export class PaginationMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;

    constructor(partial: Partial<PaginationMeta>) {
        Object.assign(this, partial);
    }
}

export class PaginatedResponse<T> {
    success: true;
    message: string;
    data: T[];
    meta: PaginationMeta;

    constructor(data: T[], meta: PaginationMeta, message = 'Success') {
        this.success = true;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }
}