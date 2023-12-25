import type { MetaFunction } from "@remix-run/node";
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef } from 'react';
import TextEdit from '~/components/TextEdit';
import { useCreateShortReadStore } from '~/store/shortReads/store';
import { ShortRead } from '~/dto/short-read';
import Authorized from '~/components/hoc/Authorized';
import { ClientStorage, ClientStorageKeys } from '~/storage/client-storage';
import { useTagsStore } from '~/store/tags/store';
import TagsSelect from '~/components/TagsSelect';
import Toggle from '~/components/Toggle';
import Button, { ButtonColor } from '~/components/Button';

export const meta: MetaFunction = () => {
	return [
		{title: "Short reads"},
		{name: "description", content: "Welcome!"},
	];
};

export default function ShortReads() {

	const editorRef = useRef(null);
	const store = useCreateShortReadStore();
	const tagsStore = useTagsStore();


	useEffect(() => {
		store?.getAll()
		tagsStore?.getAll()
	}, []);

	useEffect(() => {
		if ((store?.current?.content?.length || 0) > 10) {
			ClientStorage.set(ClientStorageKeys.content, store?.current?.content)
		}
	}, [store?.current?.content]);


	const save = () => {
		const hasData = store?.current?.title && store?.current?.content && store?.current?.urlAlias;

		if (editorRef.current && hasData) {
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

						<h1 className={'text-2xl mb-6'}>Short reads</h1>

						<TextEdit
							id={'title'}
							label={'Title'}
							placeholder={'Title'}
							value={store?.current.title}
							onChange={(v) => store?.setProp('title', v)}
						/>

						<TextEdit
							id={'priview'}
							label={'Preview'}
							placeholder={'Preview'}
							value={store?.current.preview}
							onChange={(v) => store?.setProp('preview', v)}
						/>

						<TextEdit
							id={'urlAlias'}
							label={'URL Alias'}
							placeholder={'URL Alias'}
							value={store?.current.urlAlias}
							onChange={(v) => store?.setProp('urlAlias', v)}
						/>

						<div className={'pb-6'}>
							<TagsSelect
								tags={tagsStore?.items}
								selected={store?.current?.tags}
								onSelect={(v) => store?.setProp('tags', v)}>

							</TagsSelect>
						</div>

						<div className={'py-6'}>

							<Toggle
								label={'Published'}
								isChecked={store?.current?.published ?? false}
								id={'published'}
								onChange={v => store?.setProp('published', v)}/>

						</div>

						<Editor
							apiKey={[
								'98qw16kya5pacxpe1vvi1hcg6h86ahmq0lfdtm5m8cjwwqeh',
								'4lfgr3pby1wauskojx7frnnjkzbvm0ed5o5pdmyq6flfeset'
							][0]}
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
							onChange={() => store?.setProp('content', editorRef.current?.getContent())}
						/>

						<div className={' w-100 flex items-center justify-between gap-2'}>
							<div className={'flex  gap-1'}>
								<Button
									label={'Clear'}
									color={ButtonColor.YELLOW}
									onClick={() => store?.clear()}/>
								<Button
									label={'Restore'}
									color={ButtonColor.GREEN}
									onClick={() => store?.setProp('content', ClientStorage.get(ClientStorageKeys.content))}/>
							</div>

							<div className={'w-[200px]'}>
								<Button
									label={'Save'}
									color={ButtonColor.BLUE}
									onClick={save}/>
							</div>
						</div>
					</div>
				</div>

			</div>
		</Authorized>
	);
}
