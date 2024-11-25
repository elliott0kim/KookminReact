import { Helmet } from 'react-helmet';

type TitleProps = {
    title:string;
};

function Title({title}:TitleProps) {
    return (
        <Helmet>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>
        </Helmet>
    )
}

export default Title
