import type { MetaFunction } from "@remix-run/node";
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef } from 'react';
import TextEdit from '~/components/TextEdit';
import { useCreateShortReadStore } from '~/store/shortReads/store';
import { ShortRead } from '~/dto/short-read';
import Authorized from '~/components/hoc/Authorized';

export const meta: MetaFunction = () => {
	return [
		{title: "Create smth"},
		{name: "description", content: "Welcome!"},
	];
};

export default function Create() {

	const editorRef = useRef(null);
	const store = useCreateShortReadStore();

	useEffect(() => {
		store?.getAll()
	}, []);

	const save = () => {
		if (editorRef.current) {
			store?.current?.id ?
				store?.update(store.current) :
				store?.create(store.current)
		}
	};

	return (
		<Authorized>
			<div>
				<div className={'flex flex-col md:flex-row'}>
					<div className={'sticky top-0 h-[30vh] md:h-[100vh] overflow-auto md:w-[30%] py-3 bg-gray-50'}>
						{
							(store?.items ?? []).map((item: ShortRead, index: number) => (
								<div key={`${item.id}-${index}`}>
									<div className={'w-100 px-3 pb-2 mb-2 cursor-pointer border-b-gray-200 border-b'}
											 onClick={() => store?.setCurrent(item)}>
										<div>
											{item?.title}
										</div>
										<div className={'text-gray-500 text-sm'}>
											{new Date(item?.created?.join('-')).toLocaleString()}
										</div>
									</div>
								</div>
							))
						}
					</div>
					<div className={'w-full md:w-[70%] p-3'}>

						<h2 className={'text-2xl mb-6'}>Let's create something</h2>

						<TextEdit
							id={'title'}
							label={'Title'}
							placeholder={'Title'}
							value={store?.current.title}
							onChange={(v) => store?.set('title', v)}
						/>

						<TextEdit
							id={'priview'}
							label={'Preview'}
							placeholder={'Preview'}
							value={store?.current.preview}
							onChange={(v) => store?.set('preview', v)}
						/>

						<TextEdit
							id={'urlAlias'}
							label={'URL Alias'}
							placeholder={'URL Alias'}
							value={store?.current.urlAlias}
							onChange={(v) => store?.set('urlAlias', v)}
						/>

						<Editor
							apiKey='4lfgr3pby1wauskojx7frnnjkzbvm0ed5o5pdmyq6flfeset'
							// @ts-ignore
							onInit={(evt, editor) => editorRef.current = editor}
							initialValue={store?.current.content}
							init={{
								height: 500,
								menubar: false,
								plugins: [
									'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
									'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
									'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
								],
								toolbar:
									'undo redo | casechange blocks | bold italic backcolor | \
									alignleft aligncenter alignright alignjustify | \
									bullist numlist checklist | code | removeformat ',
								content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
							}}
							onChange={() => store?.set('content', editorRef.current?.getContent())}
						/>

						<div className={'sticky bottom-3 w-100 flex items-center justify-center'}>
							<button
								className="mx-auto mt-6 w-[200px] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
								onClick={save}>
								Save
							</button>
						</div>
					</div>
				</div>

			</div>
		</Authorized>
	);
}
