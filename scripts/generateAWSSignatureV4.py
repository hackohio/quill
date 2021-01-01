# See: http://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html
# This script is used to generate the policy signature for S3 bucket uploads
# For usage, update the AWS acesss/secret keys, the request values and
# string_to_sign
# The string_to_sign will be the base64 encoded policy. See:
# https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html

import os
import base64
import datetime
import hashlib
import hmac

# ************* REQUEST VALUES *************
service = 's3'
host = 'quill-dev.s3.amazonaws.com'
region = 'us-east-1'

# AWS access key and secret value
access_key = "INSERT_ACCESS_KEY_HERE"
secret_key = "INSERT_SECRET_KEY_HERE"

algorithm = 'AWS4-HMAC-SHA256'
# String to sign is a base64 encoded policy
string_to_sign = "eyJleHBpcmF0aW9uIjogIjIwMjEtMDUtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsgCiAgICB7ImFjbCI6ICJidWNrZXQtb3duZXItZnVsbC1jb250cm9sIn0sCiAgICB7ImJ1Y2tldCI6ICJxdWlsbC1kZXYifSwgCiAgICBbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwgMCwgMTA0ODU3Nl0sCiAgICBbInN0YXJ0cy13aXRoIiwgIiRrZXkiLCAidXBsb2Fkcy8iXSwKCiAgICB7IngtYW16LWNyZWRlbnRpYWwiOiAiQUtJQTVVVlkySlJIVERTTzNHTjYvMjAyMTAxMDEvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LAogICAgeyJ4LWFtei1hbGdvcml0aG0iOiAiQVdTNC1ITUFDLVNIQTI1NiJ9LAogICAgeyJ4LWFtei1kYXRlIjogIjIwMjEwMTAxVDAwMDAwMFoiIH0KICBdCn0="


# Key derivation functions. See:
# http://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html#signature-v4-examples-python

def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()


def getSignatureKey(key, dateStamp, regionName, serviceName):
    kDate = sign(('AWS4' + key).encode('utf-8'), dateStamp)
    kRegion = sign(kDate, regionName)
    kService = sign(kRegion, serviceName)
    kSigning = sign(kService, 'aws4_request')
    return kSigning


if __name__ == "__main__":
    if access_key is None or secret_key is None:
        print('No access key is available.')
        sys.exit()

    # Create a date for headers and the credential string
    t = datetime.datetime.utcnow()
    amzdate = t.strftime('%Y%m%dT%H%M%SZ')
    datestamp = t.strftime('%Y%m%d')  # Date w/o time, used in credential scope

    # Generate the credential scope
    credential_scope = datestamp + '/' + region + \
        '/' + service + '/' + 'aws4_request'

    # Create the signing key using the function defined above.
    signing_key = getSignatureKey(secret_key, datestamp, region, service)

    # Sign the string_to_sign using the signing_key
    signature = hmac.new(signing_key, (string_to_sign).encode(
        'utf-8'), hashlib.sha256).hexdigest()

    print(f'Date: {datestamp}')
    print(f'x-amz-credentials:{access_key}/{credential_scope}')
    print(f'Signature: {signature}')
