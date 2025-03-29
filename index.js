const fs = require('fs/promises'); 

(async () => {
    // ============= >>> Open 'file.txt' in read mode ('r').
    const openFile = await fs.open('./file.txt', 'r');
    // console.log(openFile)

    // ============= >>> Registering an Event Listener for File Change
    openFile.on('change', async function () { // Attach an event listener for the 'change' event.
        let size = (await openFile.stat()).size; // Get the file size dynamically.
        let buf = Buffer.alloc(size); // Create a buffer of the same size as the file.
        let offset = 0; // Set the starting position in the buffer.
        let length = buf.byteLength; // Get the length of the buffer.
        let position = 0; // Set the file read position.
        await openFile.read(buf,offset,length,position)
        console.log(buf.toString("utf-8"));
        
    });

    // ============= >>> Watching the File for Changes
    const watcher = fs.watch('./file.txt'); // Start watching 'file.txt' for changes.
    for await (const event of watcher) { // Iterate over file change events asynchronously.
        if (event.eventType == "change") { // Check if the event type is 'change'.
            openFile.emit('change'); // Manually trigger the 'change' event.
        }
    }

})();
