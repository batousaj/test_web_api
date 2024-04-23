let wasmExports = null;

let wasmMemory = new WebAssembly.Memory({initial: 256, maximum: 256});

let wasmTable = new WebAssembly.Table({
    'initial': 1,
    'maximum': 1,
    'element': 'anyfunc'
});

let asmLibraryArg = { 
    "__handle_stack_overflow": ()=>{},
    "emscripten_resize_heap": ()=>{},
    "__lock": ()=>{}, 
    "__unlock": ()=>{},
    "memory": wasmMemory, 
    "table": wasmTable 
};

let asmImports = {
    fd_close: (fd) => {},
    fd_seek: (fd,offset_low, offset_high,whence,newOffset) => {},
    fd_write: (fd, iov, iovcnt, pnum) => {}
  };

var info = {
    'env': asmImports,
    'wasi_snapshot_preview1': asmImports
  };

async function loadWasm(){
    let response = await fetch('main.wasm');
    let bytes = await response.arrayBuffer();
    let wasmObj = await WebAssembly.instantiate(bytes, info);
    wasmExports = wasmObj.instance.exports;
}

loadWasm();