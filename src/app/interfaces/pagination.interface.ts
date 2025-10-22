export interface Paginator<T> {
    page:     number;
    count:    number;
    allPages: number;
    prevUrl:  string | null;
    nextUrl:  string | null;
    data:     T[];
}
