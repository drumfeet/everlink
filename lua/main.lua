local json = require('json')

ANT_PROCESS_ID = "uBe2djD7Qqx7-yVMkPU9cY-QjWeorHi_YCllxH_Iihw"
KEY_SUB_DOMAIN = "Sub-Domain"
KEY_TRANSACTION_ID = "Transaction-Id"
KEY_TTL = "TTL-Seconds"

local printData = function(k, v)
    local _data = {
        Key = k,
        Value = v
    }
    print(_data)
end

local sendErrorMessage = function(msg, err, target)
    if not target then
        ao.send({ Target = msg.From, Error = "true", Data = err })
        printData("Error", "Target" .. " " .. msg.From .. " " .. err)
    else
        ao.send({ Target = target, Error = "true", Data = err })
        printData("Error", "Target" .. " " .. target .. " " .. err)
    end
end

Records = Records or {}

Handlers.add('Set-Record', Handlers.utils.hasMatchingTag('Action', 'Set-Record'), function(msg)
    local owner = msg.From
    local subdomain = msg[KEY_SUB_DOMAIN]
    local transactionId = msg[KEY_TRANSACTION_ID]
    local ttl = msg[KEY_TTL] or "900" -- Default to 900 if not provided
    local username = msg.Tags.Username
    local description = msg.Tags.Description
    local strUrls = msg.Tags.Urls

    if type(subdomain) ~= 'string' or subdomain == "" then
        sendErrorMessage(msg, 'Sub-Domain is required and must be a string')
        return
    end

    if type(transactionId) ~= 'string' or transactionId == "" then
        sendErrorMessage(msg, 'Transaction-Id is required and must be a string')
        return
    end

    -- Check if subdomain already exists and verify ownership
    if Records[subdomain] then
        if Records[subdomain].Owner ~= owner then
            sendErrorMessage(msg, 'Subdomain already exists and belongs to another owner')
            return
        end
        -- Apply the update if the owner is the same
    end

    ao.send({
        Target = ANT_PROCESS_ID,
        Action = "Set-Record",
        [KEY_SUB_DOMAIN] = subdomain,
        [KEY_TRANSACTION_ID] = transactionId,
        [KEY_TTL] = ttl
    })

    local newRecord = {
        Owner = owner,
        SubDomain = subdomain,
        TransactionId = transactionId,
        TTL = ttl,
        Username = username,
        Description = description,
        Urls = strUrls
    }
    Records[subdomain] = newRecord
    printData("newRecord", newRecord)
end)

Handlers.add('Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Set-Record-Notice'), function(msg)
    printData("Set-Record-Notice", msg.Data)
end)

Handlers.add('Invalid-Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Invalid-Set-Record-Notice'),
    function(msg)
        printData("Invalid-Set-Record-Notice", msg.Data)
    end)
