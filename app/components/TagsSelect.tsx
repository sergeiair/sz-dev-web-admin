import React, { useEffect, useState } from 'react';
import { TagItem } from '~/dto/tags';


interface TagListProps {
	tags: TagItem[];
	selected : number[];
	onSelect?: (selectedTags: number[]) => void;
}

const TagSelect = ({ tags, selected, onSelect }: TagListProps) => {
	const [selectedTags, setSelectedTags] = useState<number[]>([]);

	useEffect(() => {
		if(Array.isArray(selected) && selected.length) {
			setSelectedTags(selected);
		}
	}, [selected]);

	const toggleTagSelection = (tagId: number) => {
		setSelectedTags((prevSelectedTags) => {
			const newSelectedTags = prevSelectedTags.includes(tagId)
				? prevSelectedTags.filter((id) => id !== tagId)
				: [...prevSelectedTags, tagId];

			onSelect && onSelect(newSelectedTags);

			return newSelectedTags;
		});
	};

	return (
		<div className={'flex flex-wrap gap-1 cursor-pointer'}>
			{tags.map((tag) => (
				<div
					key={tag.id}
					className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded 
						${selectedTags.includes(tag.id) ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}
					onClick={() => toggleTagSelection(tag.id)}
				>
					{tag.content}
				</div>
			))}
		</div>
	);
};

export default TagSelect;
