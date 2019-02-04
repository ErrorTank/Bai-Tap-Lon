const forgotPasswordTemplate = (user, code) => {
  return `
    <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        style="padding-bottom:20px;max-width:516px;min-width:220px;"
    >
        <tbody>
            <tr>
                <td style="width:8px" width="8"></td>
                <td>
                    <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px;">
                        <img height="24" <img height="24" src="/assets/img/Framelogo.svg" style="width:75px;height:24px;margin-bottom:16px" width="75"/>
                        <div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word; ">
                            <div style="font-size:24px">Xin chào ${user.name} < ${user.email} ></div>
                        </div>
                        <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:center">Vui lòng sao chép mã xác nhận đổi mật khẩu gồm 6 số bên dưới và điền vào trên trang đổi mật khẩu: 
                        <div style="padding-top:32px;text-align:center; font-size: 20px; font-weight: 500; color: #4184f3;">${code}</div>
                        </div>
                    </div>
                </td>
                <td style="width:8px" width="8"></td>
            </tr>
        </tbody>
    </table>
  `;
};

module.exports = {
  forgotPasswordTemplate
}