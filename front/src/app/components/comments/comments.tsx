/* eslint-disable @next/next/no-sync-scripts */

import { userNeedLogin } from '@/app/utils/misc/modalsToggle';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Avatar from '../general/avatar/avatar';
import './hideTinyMsg.css';

const Comments = () => {
  const { id: userId } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const editorRef = useRef(null) as any;

  return (
    <>
      <div className="bg-secondary rounded-lg md:w-2/3 ">
        <div className=" p-4 h-50 pb-0 mb-0 grid mx-auto md:flex gap-4 justify-center">
          <div className="w-16 md:w-32 mt-8">
            <Avatar size=" w-16 h-16  md:w-32 md:h-32  " />
          </div>
          <div className="w-full h-full">
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={``}
              init={{
                height: 175,
                menubar: false,
                plugins: [
                  ' imagetools advlist link image charmap print preview anchor visualblocks a11ychecker ',
                  ' casechange linkchecker autolink lists media mediaembed permanentpen powerpaste tinymcespellchecker ',
                ],
                toolbar_mode: 'floating',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Kenneth Suarez',
                toolbar:
                  'preview | undo redo | media image imagetools  | ' +
                  'bold italic backcolor | alignleft aligncenter alignright alignjustify |' +
                  'removeformat ',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          </div>
        </div>
        <div className="w-full p-4 mx-auto text-right">
          <a
            onClick={() => {
              // TODO: add comment to db
            }}
            className=" mx-auto mb-4  btn btn-primary  w-1/3 text-center"
          >
            Comment
          </a>
        </div>
      </div>
    </>
  );
};

export default Comments;
