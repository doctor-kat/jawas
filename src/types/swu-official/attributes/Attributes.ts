export interface AttributesWrapper<T = BasicAttributes> {
    id: number;
    attributes: T;
}

export interface BasicAttributes<T = string> {
    name: T;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
