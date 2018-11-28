import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import { getUserId, getKindByUrl } from 'common/js/util';

class EditPwd extends React.Component {
  constructor(props) {
    super(props);
    this.addCode = getKindByUrl() === 'A' ? 730077 : 630054;
  }
  render() {
    const options = {
      fields: [{
        field: 'userId',
        hidden: true,
        value: getUserId()
      }, {
        field: 'oldLoginPwd',
        title: '旧登录密码',
        type: 'password',
        required: true,
        maxlength: 30
      }, {
        field: 'newLoginPwd',
        title: '新登录密码',
        type: 'password',
        required: true,
        maxlength: 30
      }],
      addCode: this.addCode
    };
    return (
      <ModalDetail
        title='修改密码'
        visible={this.props.editPwdVisible}
        hideModal={() => this.props.setEditPwdVisible(false)}
        options={options} />
    );
  }
}

export default EditPwd;
