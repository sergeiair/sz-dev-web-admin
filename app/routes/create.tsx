import type { MetaFunction } from "@remix-run/node";
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

export const meta: MetaFunction = () => {
	return [
		{title: "Create smth"},
		{name: "description", content: "Welcome!"},
	];
};

export default function Create() {

	const editorRef = useRef(null);
	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current?.getContent());
		}
	};
	return (
		<div className={'flex-col p-5'}>
			<h2 className={'text-2xl mb-6'}>Let's create something</h2>

			<Editor
				apiKey='4lfgr3pby1wauskojx7frnnjkzbvm0ed5o5pdmyq6flfeset'
				// @ts-ignore
				onInit={(evt, editor) => editorRef.current = editor}
				initialValue="<p>This is the initial content of the editor.</p>"
				init={{
					height: 500,
					menubar: false,
					plugins: [
						'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
						'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
						'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
					],
					toolbar:
						'undo redo | casechange blocks | bold italic backcolor | \
						alignleft aligncenter alignright alignjustify | \
						bullist numlist checklist | code | removeformat ',
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
				}}
			/>

			<div className={'w-100 flex items-center justify-center'}>
				<button
					className="mx-auto mt-6 w-[200px] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
					onClick={log}>
						Save
				</button>
			</div>


		</div>
	);
}
