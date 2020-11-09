/*
  This library interacts with the ninsight REST API endpoints operated by
  Bitcoin.com
*/

const axios = require("axios")

let _this

class Ninsight {
  constructor(config) {
    // this.restURL = config.restURL
    // this.apiToken = config.apiToken

    // this.ninsightURL = `https://bch-explorer.api.bitcoin.com/v1/`
    if (config) {
      this.ninsightURL = config.ninsightURL
        ? config.ninsightURL
        : `https://rest.bitcoin.com/v2`
    }

    // Add JWT token to the authorization header.
    this.axiosOptions = {
      headers: {
        authorization: `Token ${this.apiToken}`,
        timeout: 15000
      }
    }

    _this = this
  }

  /**
   * @api Ninsight.utxo()  utxo()
   * @apiName Ninsight Utxo
   * @apiGroup Ninsight
   * @apiDescription Return list of uxto for address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let utxo = await bchjs.Ninsight.utxo('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c');
   *     console.log(utxo);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  // [
   *  //   {
   *  //     "txid": "d31dc2cf66fe4d3d3ae18e1065def58a64920746b1702b52f060e5edeea9883b",
   *  //     "vout": 1,
   *  //     "value": "1000000",
   *  //     "height": 585570,
   *  //     "confirmations": 10392
   *  //   },
   *  //   {
   *  //     "txid": "41e9a118765ecf7a1ba4487c0863e23dba343cc5880381a72f0365ac2546c5fa",
   *  //     "vout": 0,
   *  //     "value": "1000000",
   *  //     "height": 577125,
   *  //     "confirmations": 18837
   *  //   }
   *  // ]
   *
   */
  async utxo(address) {
    try {
      // Handle single address.
      if (typeof address === "string") {
        const response = await axios.post(
          `${this.ninsightURL}/address/utxo`,
          {
            addresses: [address]
          },
          _this.axiosOptions
        )
        return response.data

        // Handle array of addresses.
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.ninsightURL}/address/utxo`,
          {
            addresses: address
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }

  /**
   * @api Ninsight.transactions()  transactions()
   * @apiName Ninsight TX History
   * @apiGroup Ninsight
   * @apiDescription Return transactions history for address.
   *
   * @apiExample Example usage:
   *    (async () => {
   *   try {
   *     let txs = await bchjs.Ninsight.transactions('bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c');
   *     console.log(txs);
   *   } catch(error) {
   *    console.error(error)
   *   }
   * })()
   *
   *  // [
   *  //   {
   *  //     "pagesTotal": 1,
   *  //     "txs": [
   *  //       {
   *  //         "txid": "ec7bc8349386e3e1939bbdc4f8092fdbdd6a380734e68486b558cd594c451d5b",
   *  //         "version": 2,
   *  //         "locktime": 0,
   *  //         "vin": [
   *  //           {
   *  //             "txid": "4f1fc57c33659628938db740449bf92fb75799e1d5750a4aeef80eb52d6df1e0",
   *  //             "vout": 0,
   *  //             "sequence": 4294967295,
   *  //             "n": 0,
   *  //             ...
   *  //           }
   *  //           ...
   *  //         ]
   *  //         ...
   *  //       }
   *  //     ],
   *  //     "legacyAddress": "1LpbYkEM5cryfhs58tH8c93p4SGzit7UrP",
   *  //     "cashAddress": "bitcoincash:qrvk436u4r0ew2wj0rd9pnxhx4w90p2yfc29ta0d2n",
   *  //     "currentPage": 0
   *  //   }
   *  // ]
   *  //
   *
   */
  async transactions(address) {
    try {
      if (typeof address === "string") {
        const response = await axios.post(
          `${this.ninsightURL}/address/transactions`,
          {
            addresses: [address]
          },
          _this.axiosOptions
        )

        return response.data
      } else if (Array.isArray(address)) {
        const response = await axios.post(
          `${this.ninsightURL}/address/transactions`,
          {
            addresses: address
          },
          _this.axiosOptions
        )

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}

module.exports = Ninsight
