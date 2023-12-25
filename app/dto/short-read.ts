import { TagItem } from '~/dto/tags';

export interface ShortRead {
	id: number | null,
	title: string,
	content: string,
	preview: string,
	created: string,
	published: boolean,
	tags: TagItem[]
}
