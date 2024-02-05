export default async function downloadFile(url: any) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Now, the file contents are in the `buffer` variable as a Node.js Buffer
        return uint8Array;
    } catch (error) {
        console.error("Error downloading the file:", error);
        return null;
    }
}