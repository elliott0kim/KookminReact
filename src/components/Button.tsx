import '/css/bootstrap-icons.min.css'
import '/css/bootstrap.min.css'
import '/css/style.css'
import '/css/style.min.css'

// string a = "donghyun";
// const value:string = "donghyun";

type ButtonProps = {
    type: string;
    id: string;
    value: string;
};

export function Button({type, id, value}:ButtonProps) {
    return (
        <div className="btns-wrap">
            <input type={type} id={id} className="btn btn-primary" value={value} />
        </div>
    )
}

export default Button
