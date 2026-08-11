export default function NumberInput(props) {
    return (
        <input
            type="number"
            {...props}
            className="w-full rounded-md border px-3 py-2"
        />
    );
}