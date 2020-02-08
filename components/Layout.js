const Layout = props => {
    return (
        <div>
            <main>{props.content}</main>

            <style jsx global>{`
        body{
            margin:0;
            font-family:Roboto, -apple-system,BlinkMacSystemFont,SegoeUI,Oxygen,Ubuntu, Cantarell,Fira Sans, Droid Sans,Helvetica Neue, sans-serif;
            font-size:14px;
            line-height:1.5;
            color:#333 
        }
        `}
            </style>

        </div>
    )
}

export default Layout
