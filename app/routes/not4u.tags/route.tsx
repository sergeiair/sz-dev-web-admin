import type { MetaFunction } from "@remix-run/node";
import { useEffect } from 'react';
import TextEdit from '~/components/TextEdit';
import Authorized from '~/components/hoc/Authorized';
import { useTagsStore } from '~/store/tags/store';
import { TagItem } from '~/dto/tags';
import Button, { ButtonColor } from '~/components/Button';

export const meta: MetaFunction = () => {
	return [
		{title: "Tags"},
		{name: "description", content: "Welcome!"},
	];
};

export default function Tags() {

	const store = useTagsStore();

	useEffect(() => {
		store?.getAll()
	}, []);

	const save = () => {
		if (store?.current?.content) {
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
							(store?.items ?? []).map((item: TagItem, index: number) => (
								<div key={`${item.id}-${index}`}>
									<div
										className={'w-100 px-3 pb-2 mb-2 cursor-pointer border-b-gray-200 border-b'}
										onClick={() => store?.setCurrent(item)}>
										<div>
											{item?.content}
										</div>
									</div>
								</div>
							))
						}
					</div>
					<div className={'w-full md:w-[70%] p-3'}>
						<h1 className={'text-2xl mb-6'}>Tags</h1>

						<TextEdit
							id={'title'}
							label={'Title'}
							placeholder={'Title'}
							value={store?.current.content}
							onChange={(v) => store?.setProp('content', v)}
						/>


						<div className={'sticky bottom-3 w-full flex items-center gap-2 justify-between'}>
							<div className={'w-[200px]'}>
								<Button
									label={'Clear'}
									color={ButtonColor.RED}
									onClick={() => store?.clear()}/>
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
