/**
 * Library for storing editing data
 */

// Dependencies
const fs = require('fs')
const path = require('path')

// Container for the module (to be exported)
const lib = {
  // base directory of the data folder
  baseDir: path.join(__dirname, '/../.data/')
}

const openFile = (dir, file, flags = 'wx') => {
  const resultPromise = new Promise((resolve, reject) => {
    const path = `${lib.baseDir}${dir}/${file}.json`
    fs.open(path, flags, (error, fileDescriptor) => {
      if (!error && fileDescriptor) {
        resolve(fileDescriptor)
      } else {
        reject(new Error('Could not open the file, it may not exist yet.'))
        console.error(error)
      }
    })
  })

  return resultPromise
}

const writeFile = (fileDescriptor, data) => {
  const resultPromise = new Promise((resolve, reject) => {
    fs.writeFile(fileDescriptor, data, (error) => {
      if (!error) {
        resolve(fileDescriptor)
      } else {
        reject(new Error('Error writing to new file.'))
        console.error(error)
      }
    })
  })

  return resultPromise
}

const closeFile = (fileDescriptor) => {
  const resultPromise = new Promise((resolve, reject) => {
    fs.close(fileDescriptor, (error) => {
      if (!error) {
        resolve(fileDescriptor)
      } else {
        reject(new Error('Error closing the file.'))
        console.error(error)
      }
    })
  })

  return resultPromise
}

const readFile = (dir) => {
  const resultPromise = new Promise((resolve, reject) => {
    fs.readFile(dir, 'utf8', (error, data) => {
      if (!error && data) {
        resolve(data)
      } else {
        reject(error)
        console.error(error)
      }
    })
  })

  return resultPromise
}

const updateFile = (fileDescriptor, newData = '') => {
  const resultPromise = new Promise((resolve, reject) => {
    fs.truncate(fileDescriptor, async (error) => {
      if (!error) {
        const result = await writeFile(fileDescriptor, newData)
        resolve(result)
      } else {
        reject(error)
        console.error(error)
      }
    })
  })

  return resultPromise
}

const deleteFile = async (path) => {
  const resultPromise = new Promise((resolve, reject) => {
    fs.unlink(path, (error) => {
      if (!error) {
        resolve(`The file ${path} was deleted successfully.`)
      } else {
        reject(new Error(`Error deleting the file ${path}`))
      }
    })
  })

  return resultPromise
}

// Write data to a file
lib.create = async (config = {}, callback) => {
  try {
    const { dir, file, data = {} } = config

    const fd = await openFile(dir, file)
    await writeFile(fd, JSON.stringify(data))
    const response = await readFile(`${lib.baseDir}/${dir}/${file}.json`)
    await closeFile(fd)

    callback(null, response)
  } catch (error) {
    callback(error, null)
    console.error(error)
  }
}

lib.read = async (config = {}, callback) => {
  try {
    const { dir, file } = config
    const result = await readFile(`${lib.baseDir}/${dir}/${file}.json`)
    callback(null, result)
  } catch (error) {
    callback(error, null)
    console.error(error)
  }
}

lib.update = async (config, callback) => {
  try {
    const { dir, file, data = {} } = config

    const fd = await openFile(dir, file, 'r+')
    await updateFile(fd, JSON.stringify(data))
    const response = await readFile(`${lib.baseDir}/${dir}/${file}.json`)
    await closeFile(fd)

    callback(null, response)
  } catch (error) {
    callback(error, null)
    console.error(error)
  }
}

lib.delete = async (config, callback) => {
  const { dir, file } = config

  try {
    await deleteFile(`${lib.baseDir}/${dir}/${file}.json`)
    callback(null)
  } catch (error) {
    callback(error)
    console.error(error)
  }
}

module.exports = lib
