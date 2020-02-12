import base64
import hmac, hashlib

policy_document = '''{"expiration": "2021-01-01T00:00:00Z",
  "conditions": [ 
    {"bucket": "make-ohio-2020"}, 
    ["starts-with", "$key", "uploads/"],
    {"acl": "bucket-owner-full-control"},
    ["content-length-range", 0, 1048576]
  ]
}'''

AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY'

policy = base64.b64encode(policy_document.encode())

print(policy)

signature = base64.b64encode(hmac.new(AWS_SECRET_ACCESS_KEY.encode(), policy, hashlib.sha1).digest())

print(signature)