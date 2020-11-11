// API to be used is scan-in under the Bib Records & Inventory section
// Documentation
// https://developers.exlibrisgroup.com/alma/apis/docs/bibs/UE9TVCAvYWxtYXdzL3YxL2JpYnMve21tc19pZH0vaG9sZGluZ3Mve2hvbGRpbmdfaWR9L2l0ZW1zL3tpdGVtX3BpZH0=/

// API URL
// https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/{mms_id}/holdings/{holding_id}/items/{item_pid}

// Sandbox API KEY
// process.env.SANDBOX_SCAN_IN_API_KEY

// URL paramas

// mms_id
// per record

// holding_id
// per record

// item_pid
// per record

// op
// scan (only option)

// external_id
// false  (true or false)

// request_id
// farber4

// library
//  MAIN

// circ desk
//  %20

// despartment
// PRESDEPT

// work_order_type
// PRES

// status
// 05VENDOR

// Per conversation with Mark P on 11/11/20 this project is to convert to scan-in only to barcode and request_id to scan in items. We also need a web front end that can upload a file with these 2 columns and process them.

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

(async function () {
  try {
    //item retrieve query to Alma backend. API URL, Item Barcode, and APIKEY
    const { data } = await axios.get(
      process.env.EXLIBRIS_API_ROOT +
        process.env.EXLIBRIS_API_PATH +
        '0123501424626' +
        '&apikey=' +
        process.env.EXLIBRIS_API_BIB_GET_KEY +
        '&expand=p_avail'
    );
    // record fields needed to indentify & update the records
    const mms_id = data.bib_data.mms_id;
    const holding_id = data.holding_data.holding_id;
    const pid = data.item_data.pid;

    //returning the data object to the front end so we can show scanned item.
    console.log('item retrieve from bibs by barcode', data);
    console.log('mms_id --- ', mms_id);
    console.log('holding_id --- ', holding_id);
    console.log('pid_id --- ', pid);

    const postResponse = await axios.post(
      `https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/${mms_id}/holdings/${holding_id}/items/${pid}?op=scan&external_id=false&request_id=%20&library=MAIN&circ_desk=%20&department=DEFAULT_CIRC_DESK-MAINREPAIR&work_order_type=MAINREPAIR&status=INPROGRESS&done=false&auto_print_slip=false&place_on_hold_shelf=false&confirm=tree&register_in_house_use=true&apikey=${process.env.SANDBOX_SCAN_IN_API_KEY}`
    );

    console.log(
      'postResponse ************************************** ',
      postResponse
    );
    // item update in the sandbox using the scan-in API
  } catch (error) {
    console.log('retreiveItemErrorAPI Error:   ', error);
  }
})();
