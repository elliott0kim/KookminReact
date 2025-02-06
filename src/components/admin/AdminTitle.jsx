const AdminTitle = ({title, subTitle})=>{
    return(
        <div className="title-wrap">
            <p className="page-title">{title}</p>
            {subTitle? <p className="sub-title">{subTitle}</p>:null}
        </div>
    )
}

export default AdminTitle;