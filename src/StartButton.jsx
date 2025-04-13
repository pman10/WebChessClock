export default function StartButton({children, handleClick}) {
    return (
        <button className="startButton" onClick={handleClick}>{children}</button>
    )
}