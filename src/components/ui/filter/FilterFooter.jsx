import Button from "../Button";

export default function FilterFooter({
    onApply,
    onReset,
}) {
    return (
        <div className="flex justify-end gap-2 border-t pt-4">

            <Button
                variant="secondary"
                onClick={onReset}
            >
                Reset
            </Button>

            <Button
                onClick={onApply}
            >
                Apply Filter
            </Button>

        </div>
    );
}