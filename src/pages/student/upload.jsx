import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

// const props = {
//     name: 'file',
//     action: 'API/stuendt/upload',
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//   };

const props = {
  action: '/upload.do',
  multiple: true,
  onStart(file) {
    console.log('onStart', file, file.name);
  },
  onSuccess(ret) {
    console.log('onSuccess', ret);
  },
  onError(err) {
    console.log('onError', err);
  },

  beforeUpload(file) {
    console.log(file);
    return new Promise(resolve => {
      console.log('start check');
      setTimeout(() => {
        console.log('check finshed');
        resolve(file);
      }, 3000);
    });
  },
};

const App = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);
export default App;

// export default () => {
//     const upload = (file, name, info) => {
//         StudentAPI.upload(file, name)
//             .then(message.success(`${info.file.name} file uploaded successfully`))
//             .catch(message.error(`${info.file.name} file upload failed.`))

//     };
// }
// return (
// <Upload {...upload}>
//     <Button icon={<UploadOutlined />}>Click to Upload</Button>
// </Upload>)

