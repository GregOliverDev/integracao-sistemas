import redis

redis_client = redis.StrictRedis(host='redis', port=6379, db=0, decode_responses=True)